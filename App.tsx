<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bangkaew Digital Account</title>
  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Sarabun', sans-serif;
      background: #f8fafc;
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
      background-image: radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 20%),
                        radial-gradient(circle at 90% 80%, rgba(29, 78, 216, 0.05) 0%, transparent 20%);
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(59, 130, 246, 0.1);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
      width: 100%;
      max-width: 500px;
    }
    h2, h3 {
      color: #1e3a8a;
      font-weight: 700;
    }
    .form-label {
      color: #64748b;
      font-weight: 600;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .form-control, .form-select {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      color: #0f172a;
      border-radius: 12px;
      padding: 12px;
    }
    .form-control:focus, .form-select:focus {
      background: white;
      color: #0f172a;
      border-color: #3b82f6;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }
    .btn-primary {
      background: #2563eb;
      border: none;
      padding: 14px;
      border-radius: 12px;
      font-weight: 600;
      width: 100%;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
      transition: all 0.3s ease;
    }
    .btn-primary:hover {
      background: #1d4ed8;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
    }
    .btn-outline-light {
      color: #64748b;
      border-color: #e2e8f0;
    }
    .btn-outline-light:hover {
      background: #f1f5f9;
      color: #0f172a;
      border-color: #cbd5e1;
    }
    .particle {
      position: fixed;
      width: 4px;
      height: 4px;
      background: #3b82f6;
      border-radius: 50%;
      pointer-events: none;
      z-index: -1;
    }
  </style>
</head>
<body>
  
  <div id="login-page" class="glass-card">
    <h2 class="text-center mb-4">เข้าสู่ระบบ</h2>
    <div class="mb-3">
      <label class="form-label">เลขประจำตัวนักเรียน</label>
      <input type="text" id="username" class="form-control" placeholder="12345">
    </div>
    <div class="mb-4">
      <label class="form-label">รหัสผ่าน</label>
      <input type="password" id="password" class="form-control" placeholder="••••••••">
    </div>
    <button class="btn btn-primary" onclick="login()">เข้าสู่ระบบ</button>
    <p id="login-msg" class="text-danger mt-3 text-center small"></p>
  </div>

  <div id="main-page" class="glass-card" style="display:none;">
    <h3 class="text-center mb-1" id="user-name">ยินดีต้อนรับ</h3>
    <p class="text-center text-info small mb-4">ออมวันละนิด เพื่อชีวิตที่มั่นคง</p>
    
    <div class="mb-3">
      <label class="form-label">วันที่</label>
      <input type="date" id="date" class="form-control">
    </div>
    <div class="mb-3">
      <label class="form-label">รายการ</label>
      <input type="text" id="item" class="form-control">
    </div>
    <div class="row g-2 mb-3">
      <div class="col">
        <label class="form-label">รายรับ</label>
        <input type="number" id="income" class="form-control" value="0">
      </div>
      <div class="col">
        <label class="form-label">เงินออม</label>
        <input type="number" id="savings" class="form-control" value="0">
      </div>
      <div class="col">
        <label class="form-label">รายจ่าย</label>
        <input type="number" id="expense" class="form-control" value="0">
      </div>
    </div>
    <div class="row g-2 mb-3">
      <div class="col">
        <label class="form-label">หมวดหมู่</label>
        <select id="categoryGroup" class="form-select" onchange="updateSubTypes()">
          <option value="ปัจจัย 4">ปัจจัย 4</option>
          <option value="อื่น ๆ">อื่น ๆ</option>
        </select>
      </div>
      <div class="col">
        <label class="form-label">ประเภท</label>
        <select id="subType" class="form-select"></select>
      </div>
    </div>
    <div class="mb-4">
      <label class="form-label">หมายเหตุ</label>
      <input type="text" id="note" class="form-control">
    </div>
    <button class="btn btn-primary" id="btn-save" onclick="save()">บันทึกข้อมูล</button>
    <button class="btn btn-outline-light btn-sm mt-3 w-100" onclick="logout()">ออกจากระบบ</button>
  </div>

  <script>
    let currentUserId = "";

    // Initialize UI
    window.onload = () => {
      document.getElementById('date').valueAsDate = new Date();
      updateSubTypes();
    };

    function updateSubTypes() {
      const group = document.getElementById('categoryGroup').value;
      const sub = document.getElementById('subType');
      sub.innerHTML = "";
      
      const options = group === "ปัจจัย 4" 
        ? ["อาหาร", "ที่อยู่อาศัย", "ยารักษาโรค", "เครื่องนุ่งห่ม"]
        : ["ความจำเป็น", "ความต้องการ"];
        
      options.forEach(opt => {
        let el = document.createElement('option');
        el.value = opt;
        el.innerText = opt;
        sub.appendChild(el);
      });
    }

    function login() {
      const u = document.getElementById('username').value;
      const p = document.getElementById('password').value;
      document.getElementById('login-msg').innerText = "กำลังตรวจสอบ...";
      
      google.script.run.withSuccessHandler(res => {
        if (res.success) {
          currentUserId = u;
          document.getElementById('user-name').innerText = "สวัสดี, " + res.name;
          document.getElementById('login-page').style.display = 'none';
          document.getElementById('main-page').style.display = 'block';
        } else {
          document.getElementById('login-msg').innerText = res.message;
        }
      }).checkLogin(u, p);
    }

    function save() {
      const btn = document.getElementById('btn-save');
      btn.disabled = true;
      btn.innerText = "กำลังบันทึก...";
      
      const data = {
        studentId: currentUserId,
        date: document.getElementById('date').value,
        item: document.getElementById('item').value,
        income: document.getElementById('income').value,
        savings: document.getElementById('savings').value,
        expense: document.getElementById('expense').value,
        type: document.getElementById('categoryGroup').value + ": " + document.getElementById('subType').value,
        note: document.getElementById('note').value
      };

      google.script.run.withSuccessHandler(res => {
        if (res.success) {
          alert("บันทึกสำเร็จ! คงเหลือวันนี้: " + res.balance + " บาท");
          document.getElementById('item').value = "";
          document.getElementById('income').value = 0;
          document.getElementById('savings').value = 0;
          document.getElementById('expense').value = 0;
        } else {
          alert("ผิดพลาด: " + res.message);
        }
        btn.disabled = false;
        btn.innerText = "บันทึกข้อมูล";
      }).saveData(data);
    }

    function logout() {
      location.reload();
    }

    // Simple Background Particles
    for(let i=0; i<30; i++) {
      let p = document.createElement('div');
      p.className = 'particle';
      p.style.top = Math.random() * 100 + 'vh';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.opacity = Math.random();
      document.body.appendChild(p);
    }
  </script>
</body>
</html>
