const express = require('express');
const router = express.Router();

const { checkRole } = require('../Authentication/Authenticate');
var initModels = require("../models/init-models");
const Sequelize = require('sequelize');
const sequelize = new Sequelize('art_gallery', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres'
});
var models = initModels(sequelize);

router.get('', checkRole("Guest"), async (req, res) => {
    try {
        const ArtGalleries = await models.ArtGallery.findAll();
        return res.status(200).json({
            data: ArtGalleries,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
                read_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`},
                update_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'PUT' },
                delete_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'DELETE' },
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
                read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`},
                read_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`},
                update_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'PUT' },
                delete_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.get('/:id', checkRole("Guest"), async (req, res) => {
    try {
        const ArtGallery = await models.ArtGallery.findOne({ where: { id: req.params.id }});
        if (ArtGallery) {
            return res.status(200).json({
                data: ArtGallery,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    update_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/${ArtGallery.id}`, method: 'PUT' },
                    delete_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/${ArtGallery.id}`, method: 'DELETE' },
                    read_arts: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/${ArtGallery.id}/arts` },
                }
            });
        } else {
            return res.status(404).json({
                error: 'Art gallery not found',
                _links: {
                    read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`},
                    create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
                }});
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
                read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`},
                read_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`},
                update_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'PUT' },
                delete_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.get('/:id/arts', checkRole("Guest"), async (req, res) => {
    try {
        const Arts = await models.Art.findAll({ 
            where: { artGalleryId: req.params.id }
        });
        if (Arts.length > 0) {
            return res.status(200).json({
                data: Arts,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                    read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art`},
                    read_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`},
                    update_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'PUT' },
                    delete_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'DELETE' },
                }
            });
        } else {
            return res.status(404).json({
                error: 'No art found for this gallery',
                _links: {
                    read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`},
                    create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
                    read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art` },
                    create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
                read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`},
                read_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`},
                update_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'PUT' },
                delete_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.put('/:id', checkRole("Administrator"), async (req, res) => {
    try {
        const ArtGallery = await models.ArtGallery.findOne({ where: { id: req.params.id }});
        if (ArtGallery) {
            await ArtGallery.update(req.body);
            return res.status(200).json({
                data: ArtGallery,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    read_art: { href: `${req.protocol}://${req.get('host')}/api/art/${ArtGallery.id}`},
                    delete_art: { href: `${req.protocol}://${req.get('host')}/api/art/${ArtGallery.id}`, method: 'DELETE' },
                }
            });
        } else {
            return res.status(404).json({
                error: 'Art gallery not found',
                _links: {
                    read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`},
                    create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
            }});
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
                read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`},
                read_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`},
                update_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'PUT' },
                delete_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.post('', checkRole("Administrator"), async (req, res) => {
    try {
        const newArtGallery = await models.ArtGallery.create(req.body);
        return res.status(201).json({
            data: newArtGallery,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                read_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/${newArtGallery.id}` },
                update_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/${newArtGallery.id}`, method: 'PUT' },
                delete_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/${newArtGallery.id}`, method: 'DELETE' },
                read_arts: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/${newArtGallery.id}/arts` },
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
                read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`},
                read_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`},
                update_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'PUT' },
                delete_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.delete('/:id', checkRole("Administrator"), async (req, res) => {
    try {
        const ArtGallery = await models.ArtGallery.findOne({ where: { id: req.params.id }});
        if (ArtGallery) {
            await ArtGallery.destroy();
            return res.status(200).json({
                data: ArtGallery,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery` },
                }
            });
        } else {
            return res.status(404).json({
                error: 'Art gallery not found',
                _links: {
                    read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`},
                    create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
            }});
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
                read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`},
                read_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`},
                update_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'PUT' },
                delete_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{id}`, method: 'DELETE' },
            }
        });
    }
});

module.exports = router;
