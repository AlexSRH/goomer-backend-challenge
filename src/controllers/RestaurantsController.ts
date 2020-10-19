import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import * as Yup from 'yup';

import restaurantView from '../views/restaurants_view';
import Restaurant from '../models/Restaurant';

export default {
  async index(req: Request, res: Response) {
    const restaurantsRepository = getRepository(Restaurant);

    const restaurants = await restaurantsRepository.find({
      relations: ['images']
    });

    return res.json(restaurantView.renderMany(restaurants));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const restaurantsRepository = getRepository(Restaurant);

    const restaurant = await restaurantsRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return res.json(restaurantView.render(restaurant));
  },

  async create(req: Request, res: Response) {
    const {
      name,
      longitude,
      latitude,
      about,
      opening_hours,
    } = req.body;
  
    const restaurantsRepository = getRepository(Restaurant);

    const reqImages = req.files as Express.Multer.File[];
    const images = reqImages.map(image => {
      return { path: image.filename }
    });

    const data = {
      name,
      longitude,
      latitude,
      about,
      opening_hours,
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      opening_hours: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });
  
    await schema.validate(data, {
      abortEarly: false,
    });

    const restaurant = restaurantsRepository.create(data);
  
    await restaurantsRepository.save(restaurant);
  
    return res.status(201).json(restaurant);
  }
};