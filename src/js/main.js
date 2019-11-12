class App {
  constructor(name) {
    this.name = name;
  }

  print() {
    console.log(this.name);
  }
}

const app = new App("hey");
app.print();
