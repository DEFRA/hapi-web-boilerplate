const credentials = {
  id: '8b3a3a66-c827-45ba-b1f2-45d93a6d3ebf',
  name: 'John Smith',
  email: 'jon.smith@domain.com',
  isAdmin: true,
  emailDomain: 'domain.com',
  scope: [
    'event:manage',
    'group:manage'
  ]
}

const auth = {
  strategy: 'cookie',
  credentials
}

export default auth
