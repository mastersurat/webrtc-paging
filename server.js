const path = require("path");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// ADMIN_KEY ใส่ใน Environment variable ตอน deploy บน Render
const ADMIN_KEY = process.env.ADMIN_KEY || "changeme";

app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => res.redirect("/public/listen.html"));

let broadcasterSocketId = null;
const watchers = new Set();

io.on("connection", socket => {
  socket.on("register-broadcaster", (key, cb) => {
    if (key === ADMIN_KEY) {
      broadcasterSocketId = socket.id;
      cb && cb({ ok: true });
      io.to(broadcasterSocketId).emit("watcher-count", watchers.size);
    } else {
      cb && cb({ ok: false, error: "INVALID_KEY" });
    }
  });

  socket.on("watcher-join", () => {
    watchers.add(socket.id);
    if (broadcasterSocketId) {
      io.to(broadcasterSocketId).emit("watcher-join", socket.id);
      io.to(broadcasterSocketId).emit("watcher-count", watchers.size);
    }
  });

  socket.on("watcher-answer", ({ to, sdp }) => {
    if (to && sdp) io.to(to).emit("watcher-answer", { watcherId: socket.id, sdp });
  });

  socket.on("ice-candidate-to-watcher", ({ watcherId, candidate }) => {
    if (watcherId && candidate) io.to(watcherId).emit("ice-candidate", { candidate });
  });

  socket.on("ice-candidate-to-broadcaster", ({ candidate }) => {
    if (broadcasterSocketId && candidate) {
      io.to(broadcasterSocketId).emit("ice-candidate-from-watcher", {
        watcherId: socket.id, candidate
      });
    }
  });

  socket.on("offer-to-watcher", ({ watcherId, sdp }) => {
    if (watcherId && sdp) io.to(watcherId).emit("offer", { sdp });
  });

  socket.on("disconnect", () => {
    if (socket.id === broadcasterSocketId) {
      broadcasterSocketId = null;
      watchers.forEach(wid => io.to(wid).emit("broadcast-offline"));
    }
    if (watchers.has(socket.id)) {
      watchers.delete(socket.id);
      if (broadcasterSocketId) {
        io.to(broadcasterSocketId).emit("watcher-left", socket.id);
        io.to(broadcasterSocketId).emit("watcher-count", watchers.size);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
