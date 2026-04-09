import { redisClient } from "../DB/redis.connection.db.js";
export const baseRevokeTokenKey=(userId)=> {
    return `RevokeToken::${userId}`
}
export const revokeTokenKey = ({ userId, jti }) => `${baseRevokeTokenKey(userId)}::${jti}`;

export const set = async ({ key, value, ttl } = {}) => {
    try {
        let data = typeof value === "string" ? value : JSON.stringify(value);
        return ttl ? await redisClient.set(key, data, { EX: ttl }) : await redisClient.set(key, data);
    } catch (error) {
        console.log("Redis set error", error);
    }
}
export const update = async ({ key, value, ttl } = {}) => {
    try {
        const exists = await redisClient.exists(key);
        if (!exists) return 0;
        let data = typeof value === "string" ? value : JSON.stringify(value);
        return ttl 
            ? await redisClient.set(key, data, { EX: ttl }) 
            : await redisClient.set(key, data, { KEEPTTL: true }); 
    } catch (error) {
        console.log("Redis update error", error);
    }
}
export const get = async ({ key } = {}) => {
    try {
        const data = await redisClient.get(key);
        return typeof data === "string" ? data : JSON.parse(data);
    } catch (error) {
        console.log("Redis get error", error);
    }
}
export const mGet = async (keys = []) => {
    try {
        if (!keys.length) return 0;
        const data = await redisClient.mget(keys);
        return data;
    } catch (error) {
        console.log("Redis mGet error", error);
    }
}
export const del = async (keys) => {
    try {
        if (!keys) return 0;
        const data = await redisClient.del(keys);
        return data;
    } catch (error) {
        console.log("Redis del error", error);
    }
}
export const ttl = async ({ key } = {}) => {
    try {
        const data = await redisClient.ttl(key);
        return data;
    } catch (error) {
        console.log("Redis ttl error", error);
    }
}
export const exists = async ({ key } = {}) => {
    try {
        const data = await redisClient.exists(key);
        return data;
    } catch (error) {
        console.log("Redis exists error", error);
    }
}
export const expire = async ({ key, ttl } = {}) => {
    try {
        const data = await redisClient.expire(key, ttl);
        return data;
    } catch (error) {
        console.log("Redis expire error", error);
    }
}
export const keys = async ({ prefix } = {}) => {
    try {
        const data = await redisClient.keys(`${prefix}*`);
        return data;
    } catch (error) {
        console.log("Redis keys error", error);
    }
}
export const incr = async ({ key } = {}) => {
    try {
        return await redisClient.incr(key);
    } catch (error) {
        console.log("Redis incr error", error);
    }
}
