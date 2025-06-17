import express from 'express';
import ShopItem from '../models/ShopItem.js'; // Zorg ervoor dat het pad klopt voor jouw projectstructuur

const router = express.Router();

/**
 * @route GET /shopitems/
 * @desc Haal een lijst van alle winkelitems op
 */
router.get('/', async (req, res) => {
    try {
        const shopItems = await ShopItem.find();
        res.status(200).json({ success: true, data: shopItems });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het ophalen van de winkelitems', error });
    }
});

/**
 * @route GET /shopitems/:item_id
 * @desc Haal een specifiek winkelitem op
 */
router.get('/:item_id', async (req, res) => {
    try {
        const shopItem = await ShopItem.findOne({ item_id: req.params.item_id });
        if (!shopItem) {
            return res.status(404).json({ success: false, message: 'Winkelitem niet gevonden' });
        }
        res.status(200).json({ success: true, data: shopItem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het ophalen van het winkelitem', error });
    }
});

/**
 * @route POST /shopitems/
 * @desc Maak een nieuw winkelitem aan
 */
router.post('/', async (req, res) => {
    const { item_id, name, description, price, image_url, stock_quantity } = req.body;

    try {
        const newShopItem = new ShopItem({
            item_id,
            name,
            description,
            price,
            image_url,
            stock_quantity
        });

        await newShopItem.save();
        res.status(201).json({ success: true, message: 'Winkelitem succesvol aangemaakt', data: newShopItem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het aanmaken van het winkelitem', error });
    }
});

/**
 * @route PUT /shopitems/:item_id
 * @desc Update een bestaand winkelitem
 */
router.put('/:item_id', async (req, res) => {
    try {
        const updatedShopItem = await ShopItem.findOneAndUpdate(
            { item_id: req.params.item_id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedShopItem) {
            return res.status(404).json({ success: false, message: 'Winkelitem niet gevonden' });
        }

        res.status(200).json({ success: true, message: 'Winkelitem succesvol geüpdatet', data: updatedShopItem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het updaten van het winkelitem', error });
    }
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

export default router;