require('dotenv').config({path: require('path').join(__dirname, '../.env')});
const session = require('express-session');

// Middleware to start a session
const startSession = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    } 
}); 

// Middleware to validate the session
const checkSession = (req, res, next) => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!req.session.user) {
        return res.status(401).send(unauthorizedHTML);
    } else {
        const validRoles = [1, 2, 3];
        if (!validRoles.includes(req.session.user.roleId)) {
            return res.status(403).send("Forbidden");
        }
    }

    // Kiểm tra xem người dùng có quyền truy cập vào đường dẫn này không
    const roleId = req.session.user.roleId;
    const baseUrl = req.baseUrl;
    if (baseUrl === "/admin" && roleId !== 1) {
        return res.status(403).send("Forbidden");
    } else if (baseUrl === "/nhanvien" && roleId !== 2) {
        return res.status(403).send("Forbidden");
    } else if (baseUrl === "/bep" && roleId !== 3) {
        return res.status(403).send("Forbidden");
    }
    next();
}

const unauthorizedHTML = ` 
    <html>
      <body>
        <script>
            alert("Unauthorized, please log in.");
            window.location.href = "/login";
        </script>
      </body>
    </html>
`;

module.exports = {
    startSession,
    checkSession
};
