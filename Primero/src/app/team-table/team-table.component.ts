import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';
import { Countries } from '../interfaces/player';
import { TeamService, TeamTableHeaders } from '../interfaces/services/team.service';
import { Team } from '../interfaces/team';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {
  //teams$ denota que la var es asincronica
  public teams$: Observable<Team[]>;
  public tableHeaders=TeamTableHeaders;
  constructor(private teamService:TeamService) { }

  ngOnInit(): void {
    this.teams$=this.teamService.getTeams();
    this.teamService.getTeams().pipe(take(1)).subscribe(teams=>{
      if(teams.length===0){
        const team:Team={
          name:'MyTeam',
          country:Countries.Argentina,
          players:null
        };
        this.teamService.addTeams(team);
      }
    });
  }

}
