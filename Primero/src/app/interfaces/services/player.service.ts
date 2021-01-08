import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Player } from '../../interfaces/player';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private PlayersDb: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.PlayersDb = this.db.list('/players', (ref) =>
      ref.orderByChild('name')
    );
  }
  /*getPlayers(): Observable<Player[]> {
    return this.PlayersDb.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({ $key: c.key, ...c.payload.val() }))
      })
    )
  }  */ //tira error el codigo de Platzi
  addPlayers(player:Player){
    return this.PlayersDb.push(player)
  }
  deletePlayers(id:string){
    this.db.list('/players').remove(id)
  }
  editPlayers(newPlayerData:Player){
    const $key=newPlayerData.$key;
    delete(newPlayerData.$key);
    this.db.list('/players').update($key,newPlayerData);
  }
}
