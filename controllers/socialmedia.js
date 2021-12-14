const express = require('express');
const {ValidationError} = require('sequelize');

const router = express.Router();
const responseUtil = require('../helpers/response');
const { SocialMedia, User } = require('../models');

const createSocialMedia = (req, res) => {
    try {
        const {name, social_media_url} = req.body;
        const {id} = req.user;
        SocialMedia.create({user_id: id, name, social_media_url})
            .then((data) => {
                responseUtil.successResponse(
                    res,
                    `Hi ${name}, your social media added`,
                    {social_media: {id: data.id, name, social_media_url, userId: id, updatedAt: data.updatedAt, createdAt: data.createdAt}}
                );
            }).catch(err => {
                if (err instanceof ValidationError)
                    return responseUtil.validationErrorResponse(res, err.errors[0].message)
                else
                    return responseUtil.badRequestResponse(res, err);
            })
    } catch (e) {
        return responseUtil.serverErrorResponse(res, e.message);
    }
}

const getSocialMedia = (req, res) => {
    try {
        const {id} = req.user;

        SocialMedia.findAll({
            where: {user_id: id},
            include: {
                model: User,
                as: 'User',
                attributes: ['id', 'username', 'profile_image_url']
            }
        })
            .then((data) => {
                return responseUtil.successResponse(res, null, data)
            })
            .catch(err => {
                return responseUtil.badRequestResponse(res, err);
            })
    } catch (e) {
        return responseUtil.serverErrorResponse(res, e.message);
    }
}



router.post('/', createSocialMedia);
router.get('/', getSocialMedia)

module.exports = router;
