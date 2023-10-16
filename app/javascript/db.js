import Dexie from 'dexie';
export default db = new Dexie('chorepig-tasks');

db.version(0.3).stores({
      tasks: 'id, status'
});

db.version(1).stores({
      tasks: 'id'
});

db.version(2).stores({
      tasks: 'id, position'
});

db.on("populate", (tx) => {
    var now = new Date;
    tx.tasks.add({id: crypto.randomUUID(), description: 'Feed the hogs', position: 1, completed: false, created_at: now, updated_at: now});
    tx.tasks.add({id: crypto.randomUUID(), description: 'Curl the tails', position: 2, completed: true, created_at: now, updated_at: now});
});

db.tasks.hook('creating', function (id, obj, transaction) {
    transaction.table('tasks').where("position").aboveOrEqual(obj.position).modify(task => ++task.position)
});

db.tasks.hook('deleting', function (id, obj, transaction) {
    transaction.table('tasks').where("position").above(obj.position).modify(task => --task.position)
});

db.open();
