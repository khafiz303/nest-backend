import { Module } from '@nestjs/common';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';
import { Watchlist } from './models/watchlist.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports : [SequelizeModule.forFeature([Watchlist])] ,
  controllers: [WatchlistController],
  providers: [WatchlistService]
})
export class WatchlistModule {}
