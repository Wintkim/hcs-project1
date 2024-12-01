document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".c-form");

  // "Reset" 버튼 클릭 시 경고창 띄우고 폼 리셋
  const resetButton = form.querySelector("button[type='reset']");
  resetButton.addEventListener("click", (event) => {
    // 경고창 띄우기
    alert("Form has been reset!");
    // 폼 리셋
    form.reset();
  });

  // 폼 제출 이벤트 리스너 추가 (Ask me 버튼 클릭 시)
  const submitButton = form.querySelector('input[type="submit"]');
  submitButton.addEventListener("click", (event) => {
    // 기본 제출 동작 방지
    event.preventDefault();

    // 폼 데이터 수집
    const formData = new FormData(form);

    // 데이터 출력
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log("Form submitted with data:", data);

    // 경고창 띄우기
    alert(`Thank you for watching my Project: )!`);
  });
});
