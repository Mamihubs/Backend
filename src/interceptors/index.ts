import { Request, Response, NextFunction } from 'express';
import cacheMemoryStore from '../store';

export const storeDataInCacheMemory = async(req: Request, data: any, ttl: number) => {
    try {
        const key = req?.url;
        const store = await cacheMemoryStore()
        store.set(key, data, ttl);
        return {message: "Success", isError: false}
    } catch (error:any) {
        return {message: error?.message, isError: true}
    }
}

export const cacheInterceptor = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const key = req?.url;
        const store = await cacheMemoryStore()
        const data = await store.get(key)
        if(!data) return next();
        return res.json(data)
    } catch (error) {
        return next();
    }
};