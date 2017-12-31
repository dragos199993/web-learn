const basicController = {};

basicController.get = (req, res) => {
    res.json({
        msg:'this worked'
    });
}

export default basicController;