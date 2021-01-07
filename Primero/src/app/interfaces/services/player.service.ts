import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Player } from '../interfaces/player';
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
  getPlayers(): Observable<Player[]> {
    return this.PlayersDb.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );
  }
}
