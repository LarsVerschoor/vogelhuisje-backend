import express from 'express';
const router = express.Router();
import ShopItem from '../models/ShopItem.js';


router.use((req, res, next) => {
    console.log('[ShopItems] Request ontvangen:', req.method, req.path);
    next();
});

let shopItems = [
    {
        item_id: 1,
        name: "Standaard Vogelhuisje",
        description: "Basismodel van grenenhout",
        price: 19.99,
        image_url: "https://via.placeholder.com/150?text=Standaard",
        stock_quantity: 50,
        size: "Middel",
        sale: false,
        oldPrice: null
    },
    {
        item_id: 2,
        name: "Luxe Vogelhuisje",
        description: "Gemaakt van eikenhout",
        price: 29.99,
        image_url: "https://via.placeholder.com/150?text=Luxe",
        stock_quantity: 30,
        size: "Groot",
        sale: true,
        oldPrice: 34.99
    }
];

router.get('/', (req, res) => {
    console.log('[ShopItems] Alle items opgevraagd');
    res.json({
        success: true,
        data: shopItems,
        message: 'Shop items retrieved successfully',
        count: shopItems.length
    });
});

router.get('/:item_id', (req, res) => {
    console.log('[ShopItems] Item opgevraagd:', req.params.item_id);
    const item = shopItems.find(i => i.item_id == req.params.item_id);

    if (!item) {
        console.log('[ShopItems] Item niet gevonden:', req.params.item_id);
        return res.status(404).json({
            success: false,
            message: 'Item not found'
        });
    }

    res.json({
        success: true,
        data: item,
        message: 'Item retrieved successfully'
    });
});


/**
 * @route DELETE /shopitems/:item_id
 * @desc Verwijder een specifiek winkelitem
 */
router.delete('/:item_id', async (req, res) => {
    try {
        const deletedShopItem = await ShopItem.findOneAndDelete({ item_id: req.params.item_id });

        if (!deletedShopItem) {
            return res.status(404).json({ success: false, message: 'Winkelitem niet gevonden' });
        }

        res.status(200).json({ success: true, message: 'Winkelitem succesvol verwijderd', data: deletedShopItem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het verwijderen van het winkelitem', error });
    }


});
router.use((err, req, res, next) => {
    console.error('[ShopItems] Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

export default router;
