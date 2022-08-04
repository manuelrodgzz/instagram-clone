import React, { useState } from 'react';
import Header from './components/header'
import Stories from './components/stories'
import Posts from './components/posts'
import { faker } from '@faker-js/faker'

import { IUser } from './interfaces'
import './App.scss';
import Container from './components/cotainer';

type DataType = 'story' | 'post' | 'comment' | 'user'

const generateUser = () => ({
  name: faker.name.findName(),
  user: faker.internet.userName().toLowerCase(),
  img: faker.internet.avatar(),
})

const getMultipleRandomData = (dataType: DataType, min = 0, max = 10): any => {
  return Array.from(Array(faker.datatype.number({min, max}))).map(() => {
    if(dataType === 'comment') {
      return {
        text: faker.lorem.words(7),
        user: generateUser(),
        date: faker.date.recent()
      }
    }

    if(dataType === 'story') {
      return {
        video: '',
        seen: false
      }
    }

    if(dataType === 'post') {
      return {
        likes: faker.datatype.number(1000),
        description: faker.lorem.words(faker.datatype.number(10)),
        comments: getMultipleRandomData('comment', 0, 10),
        date: faker.date.recent(),
        picture: `${faker.image.city()}?random=${faker.datatype.number()}`, //adding random parameter to avoid cache
        location: faker.datatype.number({min: 0, max: 1}) > 0 ? faker.address.cityName() : undefined
      }
    }

    if(dataType === 'user') {
      return {
        name: faker.name.findName(),
        user: faker.internet.userName().toLowerCase(),
        img: faker.internet.avatar(),
        stories: getMultipleRandomData('story', 0, 5),
        posts: getMultipleRandomData('post', 0, 1)
      }
    }
      
  })
}

function App() {

  const [followingUsers] = useState<IUser[]>(getMultipleRandomData('user', 12, 35))

  return (
    <div className="app">
      <Header />

      <Container>
        <Stories users={followingUsers}/>
        <Posts users={followingUsers}/>
      </Container>
    </div>
  );
}

export default App;
