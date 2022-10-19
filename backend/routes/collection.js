const router = require('express').Router();
const { json } = require('express/lib/response');
const mongoose = require('mongoose');

const {
    createNewCollection,
    getCollections,
    getCollectionById,
    deleteCollectionById,
    upDateCollection,
    searchCollections,
    getActiveCollections,
    getSuspendedCollections,
    suspendByIds,
    unSuspendByIds
} = require('../controller/collection');

router.get('/', getCollections);
router.get('/detail', getCollectionById);
router.get('/search', searchCollections);
router.get('/active', getActiveCollections);
router.get('/suspended', getSuspendedCollections);

router.post('/', createNewCollection);
router.post('/suspend', suspendByIds);
router.post('/unsuspend', unSuspendByIds);

router.delete('/:id', deleteCollectionById);
router.put('/:id', upDateCollection);

module.exports = router;
