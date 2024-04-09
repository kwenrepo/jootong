module.exports = {
  apps: [
    {
      name: "web-dev",
      script: "server.ts",
      instances: 1, // NOTE: dev 는 클러스터가 아닌 fork 모드로 실행한다
      exec_mode: "fork", // NOTE: CPU 수만큼 인스턴스를 만들고 클러스터 모드로 프로세스 실행
      wait_ready: true,
      listen_timeout: 5000,
      kill_timeout: 5000,
      autorestart: true,
      watch: true,
      time:true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "development",
      }
    },
    {
      name: "web-prod",
      script: "server.ts",
      interpreter:'node',
      instances: 1,
      exec_mode: "cluster", // NOTE: CPU 수만큼 인스턴스를 만들고 클러스터 모드로 프로세스 실행
      wait_ready: true,
      listen_timeout: 5000, // ready까지 기다릴 시간. 이 시간 후 강제로 SIGNIT 시그널 발생시킨다.
      kill_timeout: 5000, // SIGINT 시그널 발생 후 SIGKILL 시그널까지 기다릴 시간. 시간이 초과하면 프로세스를 강제 종료한다.
      autorestart: true,
      watch: false,
      output:"./log/log-out.log",
      error:"./log/log-error.log",
      max_memory_restart: "500M",
      env_production: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
