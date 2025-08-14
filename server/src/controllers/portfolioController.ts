import { Response } from 'express';
import { Portfolio } from '../models/Portfolio';
import { AuthenticatedRequest } from '../types/express';

export const createPortfolio = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const portfolio = await Portfolio.create({ ...req.body, userId: req.user?._id });
    const portfolioObj = portfolio.toObject();
    portfolioObj.id = portfolioObj._id;
    delete portfolioObj._id;
    res.status(201).json(portfolioObj);
  } catch (err) {
    res.status(500).json({ message: 'Error creating portfolio', error: err });
  }
};

export const getAllPortfolios = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const portfolios = await Portfolio.find();
    const portfoliosWithId = portfolios.map((portfolio) => {
      const obj = portfolio.toObject();
      obj.id = obj._id;
      delete obj._id;
      return obj;
    });
    res.json(portfoliosWithId);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching portfolios', error: err });
  }
};

export const getMyPortfolio = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user?._id });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    const portfolioObj = portfolio.toObject();
    portfolioObj.id = portfolioObj._id;
    delete portfolioObj._id;
    res.json(portfolioObj);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching portfolio', error: err });
  }
};

export const getPortfolioById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    const portfolioObj = portfolio.toObject();
    portfolioObj.id = portfolioObj._id;
    delete portfolioObj._id;
    res.json(portfolioObj);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching portfolio', error: err });
  }
};

export const updatePortfolio = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.user?._id },
      { $set: req.body },
      { new: true }
    );
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    const portfolioObj = portfolio.toObject();
    portfolioObj.id = portfolioObj._id;
    delete portfolioObj._id;
    res.json(portfolioObj);
  } catch (err) {
    res.status(500).json({ message: 'Error updating portfolio', error: err });
  }
};

export const deletePortfolio = async (req: AuthenticatedRequest, res: Response) => {
  try {
    let deleted;
    if (req.params.id && req.user?.role === 'admin') {
      deleted = await Portfolio.findByIdAndDelete(req.params.id);
    } else {
      deleted = await Portfolio.findOneAndDelete({ userId: req.user?._id });
    }
    if (!deleted) return res.status(404).json({ message: 'Portfolio not found' });
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting portfolio', error: err });
  }
};
