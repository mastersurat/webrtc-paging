# 📣 WebRTC Paging System

ระบบ “เสียงตามสายออนไลน์” ด้วย **Node.js + Socket.IO + WebRTC**  
- **Admin**: มีรหัส ADMIN_KEY → กดเปิดไมค์เพื่อประกาศ  
- **User**: เข้าลิงก์ฟังประกาศได้อย่างเดียว (autoplay)

---

## 🚀 วิธีใช้งาน

### 1. Clone หรือสร้าง Repo
ถ้าใช้ GitHub Web Editor:
- สร้าง repo ใหม่ชื่อ `webrtc-paging`
- เพิ่มไฟล์ตามโครงสร้างนี้:
---------------------  
package.json
server.js
/public
├─ admin.html
└─ listen.html
---------------------

> โค้ดทั้งหมดอยู่ใน repo นี้แล้ว สามารถ copy ได้ตรงๆ

---

### 2. Deploy บน Render
1. สมัคร/ล็อกอิน [https://render.com](https://render.com)  
2. กด **New → Web Service**  
3. เลือก repo `webrtc-paging`  
4. ตั้งค่า:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - Runtime: Node  
5. เพิ่ม Environment Variable: ADMIN_KEY=MySecret123  <--ตัวอย่าง
(เปลี่ยน `MySecret123` เป็นรหัสจริงที่ใช้ล็อกอิน admin)

6. กด Deploy → รอจนขึ้นว่า live

---

### 3. การใช้งาน
- **หน้า Admin**:  https://xxxx.onrender.com/public/admin.html
- ใส่รหัส ADMIN_KEY → เปิดไมค์เพื่อพูด  

- **หน้า User**: https://xxxx.onrender.com/public/listen.html
- เปิดลิงก์ → ฟังประกาศได้เลย (autoplay)

---

## ⚙️ การอัปเดตโค้ด
- แก้ไฟล์ใน GitHub → Commit changes  
- Render จะ redeploy อัตโนมัติ  
- Refresh หน้าเว็บ → ใช้งานเวอร์ชันใหม่ได้ทันที  

---

## 🔒 หมายเหตุด้านความปลอดภัย
- เก็บค่า `ADMIN_KEY` ไว้เป็นความลับ อย่า push ลง GitHub  
- ใส่เฉพาะใน Environment Variable ของ Render เท่านั้น  

---

## 🛠️ ขยายต่อได้
- เพิ่มระบบล็อกอินฝั่ง user (ใช้ Firebase Auth / Passport.js)  
- รองรับผู้ฟังจำนวนมากด้วย SFU (เช่น mediasoup, Janus)  
- ทำ mobile-friendly UI  

---

✌️ พร้อมแล้ว กด Deploy แล้วประกาศได้เลย! 
