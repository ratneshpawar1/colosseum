import React from 'react';
import { Divider, Header, Icon, Step } from 'semantic-ui-react';
import firebase from 'firebase/compat/app';

import { NewRoomButton } from '../TopBar';
import styles from './Home.module.css';

export const Home = ({ user }: { user: firebase.User | undefined }) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.glassmorphism}>
          <span />
        </div>

        <Hero
          heroText={'Watch videos with friends anytime.'}
          subText={'Just hit New room button and get started'}
          action={
            <div style={{ marginTop: '8px', width: '300px' }}>
              <NewRoomButton size="huge" user={user} />
            </div>
          }
          image={'/first.jpeg'}
        />
        <Divider horizontal>
          <Header inverted as="h4">
            <Icon name="cogs" />
            Features
          </Header>
        </Divider>
        <div className={styles.featureSection}>
          <Feature
            icon="sync"
            title="Video Synchronization"
            text="Take breaks for snacks without falling behind"
          />
          <Feature
            icon="conversation"
            title="Chat"
            text="Chat with you friends,react to moments together"
          />

          <Feature
            icon="video"
            title="Video chat"
            text="Get on a video call, to make it a virtual date."
          />
        </div>
        <Hero
          heroText={'Laugh together'}
          subText={'Enjoy content with your friends even when apart'}
          image={'/second.jpeg'}
          color="green"
        />
        <Divider horizontal>
          <Header inverted as="h4">
            <Icon name="film" />
            Highlights Of Colosseum
          </Header>
        </Divider>
        <div className={styles.featureSection}>
          {/* <Feature
            icon="desktop"
            title={`VBrowser`}
            text="Watch together on a virtual browser running in the cloud."
          /> */}
          <Feature
            icon="youtube"
            title={`YouTube`}
            text="Watch any videos from YouTube in real time."
          />
          <Feature
            icon="slideshare"
            title={`Screensharing`}
            text="Share a tab or desktop."
          />
          {/* <Feature
            icon="file"
            title={`File`}
            text="Upload and stream your own file."
          /> */}
          <Feature
            icon="linkify"
            title={`URL`}
            text="Want to watch something from web? Just Paste the link and enjoy."
          />
        </div>

        <Divider horizontal />
        <div
          style={{
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className={styles.heroText}>Get started!</div>
          <div className={styles.featureSection}>
            <Step.Group style={{ margin: '8px' }}>
              <Step>
                <Icon name="certificate" />
                <Step.Content>
                  <Step.Title>1.</Step.Title>
                  <Step.Description>click on new room</Step.Description>
                </Step.Content>
              </Step>

              <Step>
                <Icon name="group" />
                <Step.Content>
                  <Step.Title>2.</Step.Title>
                  <Step.Description>
                    Share the link with friends
                  </Step.Description>
                </Step.Content>
              </Step>

              <Step>
                <Icon name="film" />
                <Step.Content>
                  <Step.Title>3.</Step.Title>
                  <Step.Description>Select content to watch.</Step.Description>
                </Step.Content>
              </Step>

              <Step>
                <Icon name="thumbs up outline" />
                <Step.Content>
                  <Step.Title>4.</Step.Title>
                  <Step.Description>Enjoy the Watch Party.</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
          </div>

          <div style={{ width: '160px' }}>
            <NewRoomButton user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({
  icon,
  text,
  title,
}: {
  icon: string;
  text: string;
  title: string;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flex: '1 1 0px',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '25px',
        minWidth: '180px',
      }}
    >
      <Icon fitted size="huge" name={icon as any} style={{ opacity: '0.6' }} />
      <h4 className={styles.featureTitle}>{title}</h4>
      <div className={styles.featureText}>{text}</div>
    </div>
  );
};

export const Hero = ({
  heroText,
  subText,
  subText2,
  action,
  image,
  color,
}: {
  heroText?: string;
  subText?: string;
  subText2?: string;
  action?: React.ReactNode;
  image?: string;
  color?: string;
}) => {
  return (
    <div className={`${styles.hero} ${color === 'green' ? styles.green : ''} `}>
      <div className={styles.heroInner}>
        <div style={{ padding: '', flex: '1 1 0' }}>
          <div className={styles.heroText}>{heroText}</div>
          <div className={styles.subText}>{subText}</div>
          <div className={styles.subText}>{subText2}</div>
          {action}
        </div>
        <div
          style={{
            flex: '1 1 0',
          }}
        >
          <img
            alt="hero"
            style={{ width: '100%', borderRadius: '25px', opacity: '0.8' }}
            src={image}
          />
        </div>
      </div>
    </div>
  );
};
