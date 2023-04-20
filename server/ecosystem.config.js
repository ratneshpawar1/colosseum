module.exports = {
  apps: [
    // {
    //   name: 'server',
    //   script: './buildServer/server.js',
    //   log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    //   env: {
    //     PORT: 80,
    //   },
    // },
    {
      name: 'shard1',
      script: './buildServer/server.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      env: {
        SHARD: 1,
        PORT: 3001,
      },
    },
    {
      name: 'shard2',
      script: './buildServer/server.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      env: {
        SHARD: 2,
        PORT: 3002,
      },
    },
    // {
    //   name: 'shard3',
    //   script: './buildServer/server.js',
    //   log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    //   env: {
    //     SHARD: 3,
    //     PORT: 3003,
    //   },
    // },
    {
      name: 'vmWorker',
      script: './buildServer/vmWorker.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      env: {
        HETZNER_GATEWAY: 'gateway2.colosseum.com',
        HETZNER_SSH_KEYS: '1570536',
        HETZNER_IMAGE: '99649800',
        SCW_GATEWAY: 'gateway1.colosseum.com',
        SCW_IMAGE: '',
        DO_GATEWAY: 'gateway4.colosseum.com',
        DO_IMAGE: '',
        DO_SSH_KEYS: '',
      },
    },
    {
      name: 'syncSubs',
      script: './buildServer/syncSubs.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
    {
      name: 'timeSeries',
      script: './buildServer/timeSeries.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
    {
      name: 'cleanup',
      script: './buildServer/cleanup.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
    {
      name: 'discordBot',
      script: './buildServer/discordBot.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
