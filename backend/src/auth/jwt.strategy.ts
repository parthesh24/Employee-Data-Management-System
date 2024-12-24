import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy} from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJyb2xlIjoidmlld2VyIiwiaWF0IjoxNzM0NjM3NDIzLCJleHAiOjE3MzQ2NDEwMjN9.QLw23htQAWxAG8k-TAd-NNDu_YbpKJjQseCZ600Hl2E',
        })
    }

    async validate(payload: any){
        return {userId: payload.sub, username: payload.username, role: payload.role};
    }
}