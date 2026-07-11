if (typeof confetti === "function") {

    const duration = 2500;

    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {

        if (Date.now() > animationEnd) {

            clearInterval(interval);

            return;

        }

        confetti({

            particleCount:5,

            startVelocity:25,

            spread:360,

            ticks:80,

            origin:{

                x:Math.random(),

                y:Math.random()-0.2

            }

        });

    },120);

}