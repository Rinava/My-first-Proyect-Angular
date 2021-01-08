import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Team } from '../team';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const TeamTableHeaders=['name','country','players'];

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private TeamsDb: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) {
    this.TeamsDb = this.db.list('/players', (ref) =>
      ref.orderByChild('name')
    );
  }
  getTeams(): Observable<Team[]> {
    return this.TeamsDb.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({ $key: c.key, ...c.payload.val() }))
      })
    )
  }  
  addTeams(team:Team){
    return this.TeamsDb.push(team)
  }
  deletePlayers(id:string){
    this.db.list('/team').remove(id)
  }
  editPlayers(newTeamData:Team){
    const $key=newTeamData.$key;
    delete(newTeamData.$key);
    this.db.list('/team').update($key,newTeamData);
  }
}
