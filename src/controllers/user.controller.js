import UserDTO from '../dao/dtos/user.dto.js';

export const getCurrent = (req, res) => {
    if (req.user) {
        const userDTO = new UserDTO(req.user);
        return res.json({ status: "success", user: userDTO });
    }
    return res.status(401).json({ status: "error", message: "No estás autenticado" });
};
