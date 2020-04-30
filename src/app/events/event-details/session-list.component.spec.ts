import { SessionListComponent } from './session-list.component';
import { ISession } from '../shared/event.model';
import { cpus } from 'os';

describe('SessionListComponent', () => {
  let component: SessionListComponent;
  let mockAuthService, mockVoterService;

  beforeEach(() => {
    component = new SessionListComponent(mockAuthService, mockVoterService);
  })

  it('should sort the sessions correctly', () => {
    component.sessions = <ISession[]>[
      { name: 'session 1', level: 'session 1' },
      { name: 'session 3', level: 'intermediate' },
      { name: 'session 2', level: 'beginner'}
    ];
    component.filterBy = 'all';
    component.sortBy = 'name';
    component.eventId = 3;

    component.ngOnChanges();

    expect(component.visibleSessions[2].name).toBe('session 3');
  });
})
