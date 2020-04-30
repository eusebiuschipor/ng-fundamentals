import { VoterService } from './voter.service';
import { ISession } from '../shared/event.model';
// import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs';

describe('VoterService', () => {
  let voterService: VoterService, mockHttp;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    let voterService = new VoterService(mockHttp);
  });

  describe('deleteVoter', () => {

    xit('should remove the voter from the list of voters', () => {
      var session = {id: 6, voters: ["joe", "john"]};
      mockHttp.delete.and.returnValue(of(false));

      voterService.deleteVoter(3, <ISession>session, "joe");

      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe("john");
    });

    xit('should call http.delete with the right URL', () => {
      var session = {id: 6, voters: ["joe", "john"]};
      mockHttp.delete.and.returnValue(of(false));

      //voterService.deleteVoter(3, <ISession>session, "joe");

      expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe');
    });
  });
});
