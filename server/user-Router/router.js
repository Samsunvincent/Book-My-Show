const express = require('express');
const router = express.Router();
const controllers = require('../user-controller/controller');


router.post('/add',controllers.add);
router.get('/getdatas',controllers.get_datas);
router.get('/getdata/:id',controllers.get_data);
router.put('/update_data/:id',controllers.update_data);
router.delete('/delete_data/:id',controllers.delete_data);
router.get('/filter',controllers.filter_data)
router.get('/category',controllers.selectcategory)
router.get('/language',controllers.selectlanguage)



module.exports = router;