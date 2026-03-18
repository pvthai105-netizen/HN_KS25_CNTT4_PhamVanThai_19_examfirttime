const nameInput = document.getElementById("contact-name");
const phoneInput = document.getElementById("contact-phone");
const emailInput = document.getElementById("contact-email");
const tbody = document.getElementById("contact-tbody");
const submitBtn = document.querySelector(".btn-add");
const nobita = document.getElementById("contact-form");
let contacts = [
  { name: "Nguyễn Văn An", phone: "0901234567", email: "an@gmail.com" },
  { name: "Trần Thị Bình", phone: "0912345678", email: "binh@gmail.com" },
  { name: "Lê Văn Cường", phone: "0923456789", email: "cuong@gmail.com" },
  { name: "Phạm Thị Dung", phone: "0934567890", email: "dung@gmail.com" },
  { name: "Hoàng Văn Em", phone: "0945678901", email: "em@gmail.com" },
];

let editIndex = null;

const renderContacts = () => {
  tbody.innerHTML = contacts
    .map(
      (c, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${c.name}</td>
        <td>${c.phone}</td>
        <td>${c.email}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-edit" data-index="${index}">Sửa</button>
            <button class="btn-delete" data-index="${index}">Xóa</button>
          </div>
        </td>
      </tr>
    `,
    )
    .join("");
};

const validate = (name, phone, email) => {
  if (!name.trim()) {
    alert("Tên không được để trống!");
    return false;
  }

  if (name.trim().length < 3) {
    alert("Tên phải ít nhất 3 ký tự!");
    return false;
  }

  if (!phone.trim()) {
    alert("SĐT không được để trống!");
    return false;
  }

  if (!/^\d+$/.test(phone)) {
    alert("SĐT phải là số!");
    return false;
  }

  if (!email.trim()) {
    alert("Email không được để trống!");
    return false;
  }

  return true;
};

nobita.addEventListener("submit", (e) => {
  e.preventDefault();

  if (editIndex === null) {
    alert("Hãy chọn 1 danh bạ để sửa!");
    return;
  }

  const name = nameInput.value;
  const phone = phoneInput.value;
  const email = emailInput.value;

  if (!validate(name, phone, email)) return;

  contacts[editIndex] = { name, phone, email };

  alert("Cập nhật thành công!");

  editIndex = null;
  submitBtn.textContent = "Thêm";

  e.target.reset();
  renderContacts();
});
tbody.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("btn-edit")) {
    const contact = contacts[index];
    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;
    editIndex = index;
    submitBtn.textContent = "Cập nhật";
  }
  if (e.target.classList.contains("btn-delete")) {
    const confirmDelete = confirm("Bạn có chắc muốn xóa?");

    if (confirmDelete) {
      contacts.splice(index, 1);
      alert("Xóa thành công!");
      renderContacts();
    }
  }
});
renderContacts();
