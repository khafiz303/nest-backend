import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { CreateAssetResponse } from './response';


@Injectable()
export class WatchlistService {
    constructor(@InjectModel(Watchlist) private readonly watchlistRepository : typeof Watchlist){}

    async createAsset(user , dto) : Promise<CreateAssetResponse>{
       try {
        const watchList ={
            user : user.id,
            name : dto.name ,
            assetId : dto.assetId
        }
        await this.watchlistRepository.create(watchList)
        return watchList
        
       } catch (error) {
        throw new Error(error)
       }
    }

    async deleteAsset(userId : number , assetId : string) : Promise <boolean>{
        try {
            await  this.watchlistRepository.destroy({where : {user : userId , id : assetId}}) 
            return true
        } catch (error) {
            throw new Error(error)
        }
      

    }

}
