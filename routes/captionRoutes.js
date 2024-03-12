// routes/captionRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/config');
const Caption = db.Caption;
const { authenticateUser } = require('../middlewares/auth');

// Create caption
/**
 * @swagger
 * /api/captions:
 *   post:
 *     summary: Create a new caption
 *     description: Create a new caption for the photo contest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *               caption:
 *                 type: string
 *     responses:
 *       201:
 *         description: Caption created successfully
 *       500:
 *         description: Server error
 */
router.post('/', authenticateUser, async (req, res) => {
    try {
        const { imageUrl, caption } = req.body;
        const userId = req.user.id;

        const newCaption = await Caption.create({
            userId,
            imageUrl,
            caption
        });

        res.status(201).json({ message: 'Caption created successfully', caption: newCaption });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all captions
/**
 * @swagger
 * /api/captions:
 *   get:
 *     summary: Get all captions
 *     description: Returns an array of caption objects
 *     responses:
 *       200:
 *         description: An array of captions
 *       500: 
 *         description: Server error
 */
router.get('/', async (req, res) => {
    try {
        const captions = await Caption.findAll();
        res.json(captions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update caption
/**
 * @swagger
 * /api/captions/{id}:
 *  put:
 *    summary: Update a caption
 *    description: Update the caption text for a given caption ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The caption ID
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              caption: 
 *                type: string
 *                description: The updated caption text
 *    responses:
 *      200:
 *        description: Caption updated successfully
 *      500:
 *        description: Server error
 */
router.put('/:id', authenticateUser, async (req, res) => {
    try {
        const { id } = req.params;
        const { caption } = req.body;

        const updatedCaption = await Caption.update({ caption }, { where: { id } });

        res.json({ message: 'Caption updated successfully', caption: updatedCaption });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete caption
/**
 * @swagger
 * /api/captions/{id}:
 *   delete:
 *     summary: Delete a caption
 *     description: Deletes a caption with the given ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The caption ID
 *     responses:
 *       200:
 *         description: Caption deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/:id', authenticateUser, async (req, res) => {
    try {
        const { id } = req.params;
        await Caption.destroy({ where: { id } });

        res.json({ message: 'Caption deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
