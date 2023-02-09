import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Link } from '@react-email/link';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import * as React from 'react';

export default function Email() {
  return (
    <Html>
      <Head />
      <Preview>Login Code for Commit</Preview>
      <Section style={main}>
        <Container style={container}>
        
          <Img
            src="https://i.pinimg.com/564x/26/82/78/2682787e9d8241a3164a67748ac505b6.jpg"
            width="60"
            height="60"
            alt="Notion's Logo"
          />

          <Text style={h1}>commit</Text>
          <Text style={h1}>log in code</Text>

          <Text style={{ ...text, marginBottom: '14px' }}>
            Your confirmation code is below - enter it in your open browser window and we'll help you get signed in.
          </Text>
          <code style={code}>9456</code>

          <Text
            style={{
              ...text,
              marginTop: '12px',
              marginBottom: '38px',
            }}
          >
            If you didn't request this email, there's nothing to worry about - you can safely ignore it.
          </Text>

        </Container>
      </Section>
    </Html>
  );
}

const main = {
  backgroundColor: '#0D1015',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '40px auto',
};

const h1 = {
  color: '#fff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '48px',
  fontWeight: 'bold',
  marginBottom: '40px',
  padding: '0',
};

const text = {
  color: '#3D4248',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '18px',
  margin: '36px 0',
};

const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#3D4248',
  borderRadius: '12px',
  color: '#fff',
  letterSpacing: '12px',
  textAlign: 'center',
  fontSize: '48px'
};
