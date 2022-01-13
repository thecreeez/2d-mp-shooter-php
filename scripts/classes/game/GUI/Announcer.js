class Announcer {
    /**
     * Анонсирует убийства через events
     */

    events = [];

    render() {
        let index = 0
        this.events.forEach((event) => {
            if (!event.isExpired) {
                event.render(index);
                index++;
            }
        })

        if (this.currentAnnounce)
            this.announce(this.currentAnnounce);
    }

    announce(event) {

    }

    update() {
        this.events.forEach((event) => {
            event.update();
        })

        if (!this.currentAnnounce)
            return;

        if (this.currentAnnounce.isExpired)
            this.currentAnnounce = null;
    }

    addEvent(data) {
        this.events.push(
            new EventG({
                user1: data.users[0], 
                user2: data.users[1], 
                type: data.type, 
                time: data.time, 
                id: data.id
            })
        )
    }
}