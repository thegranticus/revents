import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import cuid from 'cuid';
import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm'

const eventsDashboard = [
  {
    id: '1',
    title: 'Power Clean',
    date: '2018-03-27T11:00:00+00:00',
    category: 'culture',
    description:
      'Hook grip is used by advanced lifters to maintain grip during the clean. Do not jerk weight from floor; arise steadily then accelerate through movement. In a Powre Clean, the barbell is lifted from the floor to the shoulders. The lift is complete when feet are in line and bar is under control.',
    city: 'Deerfield Beach, FL',
    venue: "BARWIS Performance Center of South Florida",
    hostedBy: 'Grant',
    hostPhotoURL: 'http://www.efficientmovement.com/wp-content/uploads/2016/03/power-clean-e1443212757893.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Zac',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Back Squat',
    date: '2018-03-28T14:00:00+00:00',
    category: 'drinks',
    description:
      'From rack with barbell at upper chest height, position bar high on back of shoulders and grasp barbell to sides. Dismount bar from rack and stand with shoulder width stance. Squat down by bending hips back while allowing knees to bend forward, keeping back straight and knees pointed in same direction as feet.',
    city: 'Deerfield Beach, FL',
    venue: 'BARWIS Performance Center of Port Saint Lucie',
    hostedBy: 'Zac',
    hostPhotoURL: 'https://static1.squarespace.com/static/55e406fbe4b0b03c5e7543ae/t/58f896e8b8a79b5ac1884b3c/1492686579787/Barbell+Back+Squats',
    attendees: [
      {
        id: 'b',
        name: 'Zac',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]


class EventDashboard extends Component {
    state = {
      events: eventsDashboard,
      isOpen: false
    }


handleFormOpen = () => {
  this.setState({
    isOpen: true
  });
};

handleCancel = () => {
  this.setState({
    isOpen: false
  });
};

handleCreateEvent = (newEvent) => {
  newEvent.id = cuid();
  newEvent.hostPhotoURL = '/assets/user.png';
  const updatedEvents = [...this.state.events, newEvent];
  this.setState({
    events: updatedEvents,
    isOpen: false
  });
};

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={this.state.events} />
        </Grid.Column>
        <Grid.Column width={6}>
        <Button onClick={this.handleFormOpen} positive content='Add Exercise'/>
        {this.state.isOpen && (
        <EventForm createEvent={this.handleCreateEvent} handleCancel ={this.handleCancel}/>)}
        </Grid.Column>
      </Grid>
    )
  }
}

export default EventDashboard
