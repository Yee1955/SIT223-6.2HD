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
        const Artists = await models.Artist.findAll();
        return res.status(200).json({
            data: Artists,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                read_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`},
                update_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'PUT' },
                delete_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'DELETE' },
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist`},
                read_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`},
                update_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'PUT' },
                delete_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.get('/:id', checkRole("Guest"), async (req, res) => {
    try {
        const Artist = await models.Artist.findOne({ where: { id: req.params.id }});
        if (Artist) {
            return res.status(200).json({
                data: Artist,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    update_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'PUT' },
                    delete_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'DELETE' },
                    read_arts: { href: `${req.protocol}://${req.get('host')}/api/artist/${Artist.id}/arts` },
                }
            });
        } else {
            return res.status(404).json({
                error: 'Artist not found',
                _links: {
                    read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist`},
                    create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                }});
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist`},
                read_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`},
                update_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'PUT' },
                delete_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.get('/:id/arts', checkRole("Guest"), async (req, res) => {
    try {
        const Arts = await models.Art.findAll({ 
            where: { artistId: req.params.id }
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
                error: 'No art found for this artist',
                _links: {
                    read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist`},
                    create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                    read_all_arts: { href: `${req.protocol}://${req.get('host')}/api/art` },
                    create_art: { href: `${req.protocol}://${req.get('host')}/api/art`, method: 'POST' },
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist`},
                read_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`},
                update_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'PUT' },
                delete_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.put('/:id', checkRole("Administrator"), async (req, res) => {
    try {
        const Artist = await models.Artist.findOne({ where: { id: req.params.id }});
        if (Artist) {
            await Artist.update(req.body);
            return res.status(200).json({
                data: Artist,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    read_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/${Artist.id}`},
                    delete_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/${Artist.id}`, method: 'DELETE' },
                }
            });
        } else {
            return res.status(404).json({
                error: 'Artist not found',
                _links: {
                    read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist`},
                    create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                }});
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist`},
                read_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`},
                update_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'PUT' },
                delete_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.post('', checkRole("Administrator"), async (req, res) => {
    try {
        const newArtist = await models.Artist.create(req.body);
        return res.status(201).json({
            data: newArtist,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                read_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/${newArtist.id}` },
                update_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/${newArtist.id}`, method: 'PUT' },
                delete_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/${newArtist.id}`, method: 'DELETE' },
                read_arts: { href: `${req.protocol}://${req.get('host')}/api/artist/${newArtist.id}/arts` },
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist`},
                read_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`},
                update_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'PUT' },
                delete_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'DELETE' },
            }
        });
    }
});

router.delete('/:id', checkRole("Administrator"), async (req, res) => {
    try {
        const Artist = await models.Artist.findOne({ where: { id: req.params.id }});
        if (Artist) {
            await Artist.destroy();
            return res.status(200).json({
                data: Artist,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist` },
                }
            });
        } else {
            return res.status(404).json({
                error: 'Artist not found',
                _links: {
                    read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist`},
                    create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
            }});
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            _links: {
                create_artist: { href: `${req.protocol}://${req.get('host')}/api/artist`, method: 'POST' },
                read_all_artists: { href: `${req.protocol}://${req.get('host')}/api/artist`},
                read_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`},
                update_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'PUT' },
                delete_artist: { href: `${req.protocol}://${req.get('host')}/api/artist/{id}`, method: 'DELETE' },
            }
        });
    }
});

module.exports = router;
