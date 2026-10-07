const Account = require('../src/modelo');

test('Cuenta debe iniciar sin statements', () => {
  const account = new Account()

  expect(account.printStatement()).toEqual(['Date || Amount || Balance'])
});

test('Se debe poder depositar 10 en una cuenta', () => {
  const account = new Account()
  
  account.deposit(10)
  
  expect(account.printStatement()).toEqual(
    ['Date || Amount || Balance',
    '2026-10-07 || 10 || 10'])
});

test('Se debe poder depositar en una cuenta', () => {
  const account = new Account()
  
  account.deposit(100)
  
  expect(account.printStatement()).toEqual(
    ['Date || Amount || Balance',
    '2026-10-07 || 100 || 100'])
});

test('Si hago dos depositos, debe de mostrar ambos', () =>{
  const account = new Account()
  
  account.deposit(100)
  account.deposit(100)
  expect(account.printStatement()).toEqual(
    ['Date || Amount || Balance',
    '2026-10-07 || 100 || 100',
    '2026-10-07 || 100 || 200'])
})

test('Si quiero retirar dinero y no tego, debe de dar error', () =>{
  const account = new Account()

  account.deposit(100)
  expect(() => account.withdraw(200)).toThrow("No hay dinero en la cuenta");
})

test("si deposito 1000, retiro 500 y despues deposito 2000 la funcion printStatement debe retornar un string de la forma: Date || Amount || Balance /n 2026/10/5 || 2000 || 2500 /n 2026/10/5 || -500 || 500 /n 2026/10/5 || 1000 || 1000",()=>{
    const cuenta=new Account()
    cuenta.deposit(1000)
    cuenta.withdraw(500)
    cuenta.deposit(2000)
    console.log(cuenta.printStatement())
    expect(cuenta.printStatement()).toEqual(
      ["Date || Amount || Balance",
      "2026-10-07 || 1000 || 1000",
        "2026-10-07 || -500 || 500",
        "2026-10-07 || 2000 || 2500"])
})