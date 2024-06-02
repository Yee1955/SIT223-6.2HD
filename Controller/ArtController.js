const express = require('express');
const router = express.Router();

const { checkRole } = require('../Authentication/Authenticate');
var initModels = require("../models/init-models");
const sequelize = require('../sequelize');

var models = initModels(sequelize);

router.get('', checkRole("Guest"), async (req, res) => {
    try {
        const arts = await models.Art.findAll();
        return res.status(200).json({
            data: arts,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                read_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`},
                update_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'PUT' },
                delete_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'DELETE' },
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art`},
                read_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`},
                update_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'PUT' },
                delete_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.get('/:id', checkRole("Guest"), async (req, res) => {
    try {
        const art = await models.Art.findOne({ where: { id: req.params.id }});
        if (art != null) {
            return res.status(200).json({
                data: art,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    update_art: { href: `${req.protocol}://${req.get('host')}/api/art/${art.id}`, method: 'PUT' },
                    delete_art: { href: `${req.protocol}://${req.get('host')}/api/art/${art.id}`, method: 'DELETE' },
                    read_artist: { href: `${req.protocol}://${req.get('host')}/api/art/${art.id}/artist` },
                    read_art_galley: { href: `${req.protocol}://${req.get('host')}/api/art/${art.id}/art-gallery` },
                }
            });
        } else {
            return res.status(404).json({
                error: 'Artwork not found',
                _links: {
                    read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art` },
                    create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art`},
                read_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`},
                update_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'PUT' },
                delete_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.get('/:id/artist', checkRole("Guest"), async (req, res) => {
    try {
        const art = await models.Art.findOne({ 
            where: { id: req.params.id },
            include: [{
                model: models.Artist,
                as: 'artist'
            }]
        });

        if (art && art.artist) {
            return res.status(200).json({
                data: art.artist,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                    read_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{${art.id}` },
                    read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist` },
                    update_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/${art.id}`, method: 'PUT' },
                    delete_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/${art.id}`, method: 'DELETE' },
                    read_art_galley: { href: `${req.protocol}://${req.get('host')}/api/art/${art.id}/art-gallery` },
                }
            });
        } else {
            res.status(404).json({
                error: 'Art or Artist not found', 
                _links: {
                    read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art` },
                    create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                    read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist` },
                    create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art`},
                read_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`},
                update_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'PUT' },
                delete_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.get('/:id/art-gallery', checkRole("Guest"), async (req, res) => {
    try {
        const art = await models.Art.findOne({ 
            where: { id: req.params.id },
            include: [{
                model: models.ArtGallery,
                as: 'artGallery'
            }]
        });

        if (art && art.artGallery) {
            return res.status(200).json({
                data: art.artGallery,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
                    read_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/{${art.id}` },
                    read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery` },
                    update_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/${art.id}`, method: 'PUT' },
                    delete_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery/${art.id}`, method: 'DELETE' },
                    read_artist: { href: `${req.protocol}://${req.get('host')}/api/art/${art.id}/artist` },
                }
            });
        } else {
            res.status(404).json({
                error: 'Art or Art Gallery not found', 
                _links: {
                    read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art` },
                    create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                    read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery` },
                    create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art`},
                read_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`},
                update_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'PUT' },
                delete_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.put('/:id', checkRole("Administrator"), async (req, res) => {
    try {
        const { artistId, artGalleryId } = req.body;

        // Check if the artist exists
        const artist = await models.Artist.findOne({ where: { id: artistId } });
        if (!artist) {
            return res.status(400).json({ 
                error: 'Artist not found',
                _links: {
                    read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist` },
                    create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                }
            });
        }

        // Check if the art gallery exists
        const artGallery = await models.ArtGallery.findOne({ where: { id: artGalleryId } });
        if (!artGallery) {
            return res.status(400).json({ 
                error: 'Art gallery not found',
                _links: {
                    read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery` },
                    create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
                }
            });
        }

        const art = await models.Art.findOne({ where: { id: req.params.id } });
        if (art) {
            await art.update(req.body);
            return res.status(200).json({
                data: art,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    read_art: { href: `${req.protocol}://${req.get('host')}/api/art/${art.id}` },
                    delete_art: { href: `${req.protocol}://${req.get('host')}/api/art/${art.id}`, method: 'DELETE' },
                    read_artist: { href: `${req.protocol}://${req.get('host')}/api/art/${art.id}/artist` },
                    read_art_galley: { href: `${req.protocol}://${req.get('host')}/api/art/${art.id}/art-gallery` },
                }
            });
        } else {
            return res.status(404).json({
                error: 'Artwork not found',
                _links: {
                    read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art` },
                    create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art`},
                read_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`},
                update_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'PUT' },
                delete_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.post('', checkRole("Administrator"), async (req, res) => {
    try {
        const { artistId, artGalleryId } = req.body;

        // Check if the artist exists
        const artist = await models.Artist.findOne({ where: { id: artistId } });
        if (!artist) {
            return res.status(400).json({
                error: 'Artist not found',
                _links: {
                    read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist` },
                    create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                }
            });
        }

        // Check if the art gallery exists
        const artGallery = await models.ArtGallery.findOne({ where: { id: artGalleryId } });
        if (!artGallery) {
            return res.status(400).json({
                error: 'Art gallery not found',
                _links: {
                    read_all_art_galleries: { href: `${req.protocol}://${req.get('host')}/api/art-gallery` },
                    create_art_gallery: { href: `${req.protocol}://${req.get('host')}/api/art-gallery`, method: 'POST' },
                }
            });
        }

        const newArt = await models.Art.create(req.body);
        return res.status(201).json({
            data: newArt,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                read_art: { href: `${req.protocol}://${req.get('host')}/api/art/${newArt.id}` },
                update_art: { href: `${req.protocol}://${req.get('host')}/api/art/${newArt.id}`, method: 'PUT' },
                delete_art: { href: `${req.protocol}://${req.get('host')}/api/art/${newArt.id}`, method: 'DELETE' },
                read_artist: { href: `${req.protocol}://${req.get('host')}/api/art/${newArt.id}/artist` },
                read_art_galley: { href: `${req.protocol}://${req.get('host')}/api/art/${newArt.id}/art-gallery` },
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art`},
                read_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`},
                update_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'PUT' },
                delete_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'DELETE' },
            }
        });
    }
});


router.delete('/:id', checkRole("Administrator"), async (req, res) => {
    try {
        const Art = await models.Art.findOne({ where: { id: req.params.id }});
        if (Art) {
            await Art.destroy();
            return res.status(200).json({
                data: Art,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art` },
                }
            });
        } else {
            return res.status(404).json({
                error: 'Artwork not found',
                _links: {
                    read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art` },
                    create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art`},
                read_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`},
                update_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'PUT' },
                delete_art: { href: `${req.protocol}://${req.get('host')}/api/art/{id}`, method: 'DELETE' },
            }
        });
    }
});

module.exports = router;
