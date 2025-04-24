const pathname = window.location.pathname;

if (pathname.startsWith('/auth/signin')) {
  const signinForm = document.getElementById('signin');
  const emailInput = document.getElementById('inputEmail');
  const passwordInput = document.getElementById('inputPassword');
  const rememberMeInput = document.getElementById('remember-me');

  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const rememberMe = rememberMeInput.checked;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/v1/user/signin', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;
    xhr.timeout = 30000;

    xhr.onload = function () {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        swal("Thành Công!", data.message, 'success');
        window.setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else if (xhr.status === 401) {
        swal("Thất Bại!", data.message, 'error');
      } else {
        swal("Thất Bại!", "Đã xảy ra lỗi khi đăng nhập", "error");
      }
    };

    xhr.send(JSON.stringify({
      email,
      password,
      rememberMe
    }));
  });
}
if (pathname.startsWith('/auth/signup')) {
  const signupForm = document.getElementById('signup');
  const usernameInput = document.getElementById('inputUsername');
  const emailInput = document.getElementById('inputEmail');
  const passwordInput = document.getElementById('inputPassword');
  const confirmPasswordInput = document.getElementById('inputConfirmPassword');

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (password !== confirmPassword) {
      swal("Chú Ý!", "Mật khẩu không khớp", "error");
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/v1/user/signup', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.timeout = 30000;
    xhr.withCredentials = true;

    xhr.onload = function () {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        swal("Thành Công!", data.message, 'success');
        window.setTimeout(() => {
          window.location.href = "signin";
        }, 1500);
      } else if (xhr.status === 401) {
        swal("Thất Bại!", data.message, 'error');
      } else {
        swal("Thất Bại!", "Đã xảy ra lỗi khi đăng ký", "error");
      }
    };

    xhr.send(JSON.stringify({
      username,
      email,
      password,
      confirmPassword
    }));
  });
}
if (pathname.startsWith('/phim/')) {
}

