import React, { useState } from 'react';
import Header from './components/header'
import Stories from './components/stories'
import Posts from './components/posts'
import faker from 'faker'

import { IUser } from './interfaces'
import './App.scss';

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
        location: faker.address.cityName()
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

  const [following] = useState<IUser[]>(getMultipleRandomData('user', 5, 15))

  return (
    <div className="app">
      <Header />

      <div className='content'>
        <Stories users={following}/>
        <Posts users={following}/>
      </div>
    </div>
  );
}

export default App;
