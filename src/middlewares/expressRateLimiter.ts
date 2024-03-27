import {rateLimit, RateLimitRequestHandler} from 'express-rate-limit'

/**
 * 
 * @param limit the maximum number of requests
 * @param time the number of minutes to wait
 * @returns RateLimitRequestHandler
 */
const expressRateLimiter = (limit: number = 10, time: number = 30) => rateLimit({
	windowMs: time * 60 * 1000, // 15 minutes
	limit: limit, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
    message: "Too many requests made  from this IP address, please try again later after 30 minutes."
})


export default expressRateLimiter