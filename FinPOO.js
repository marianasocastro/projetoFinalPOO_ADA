class Cliente{

    constructor(nome, idade, cpf){
        this.nome = nome;
        this.idade = idade;
        this.cpf = cpf;
    }

    getInformacoesCliente(){
        console.log(`O nome do cliente é ${this.nome}, sua idade é ${this.idade} e seu o número de seu CPF é ${this.cpf}`)

    }
}

class Conta{

    #saldo
    #historico = new HistoricoDeTransacoes();

    constructor(cliente, numeroConta, saldo){
        this.cliente = cliente;
        this.numeroConta = numeroConta;
        this.#saldo = saldo; 
    }

    realizarOperacao(){};

    verSaldo(){
        console.log(`Seu saldo é de R$${this.#saldo}`)
    }

    getSaldo(){
        return this.#saldo;
    }

    transferir(pessoa, valor){
        if(valor <= this.#saldo){
            this.#saldo -= valor;
            this.#historico.adicionarTransacao(`Você transferiu R$${valor} para ${pessoa} e seu saldo agora é de R$${this.#saldo}.`)
        }
    }

    verHistoricoTransacoes(){
        console.log(this.#historico.listarTransacoes())
    }

    sacar(valor){
        if(valor <= this.#saldo){
            this.#saldo -= valor;
            this.#historico.adicionarTransacao(`Você sacou R$${valor} e seu saldo agora é de R$${this.#saldo}.`)
            console.log(`Você sacou R$${valor} e seu saldo agora é de R$${this.#saldo}.`)
        } else{
            console.log("Saldo insuficiente.")
        }
    }

    depositar(valor){
        this.#saldo += valor;
        this.#historico.adicionarTransacao(`Você depositou R$${valor} e seu saldo agora é de R$${this.#saldo}.`)
        console.log(`Depósito realizado com sucesso! Seu novo saldo é de R$${this.#saldo}.`)
    }
}



class ContaCorrente extends Conta{

    constructor(cliente, numeroConta, saldo) {
        super(cliente, numeroConta, saldo);
    }

    verSaldo(){
        super.verSaldo();
    };
    sacar(valor){
        super.sacar(valor);
    };
    depositar(valor){
        super.depositar(valor);
    };
    verHistoricoTransacoes(){
        super.verHistoricoTransacoes()
    };

    // realiza transferencias
    realizarOperacao(pessoa, valor){

        let saldo = this.getSaldo();

        if(valor <= saldo){
            this.transferir(pessoa, valor);
        } else{
            console.log(`Saldo insuficiente para realizar a operação. No momento você pode fazer operações de até R$${this.getSaldo()}`)
        }
    }

}

class ContaPoupanca extends Conta{

    taxaJuros = 0.05;

    constructor(cliente, numeroConta, saldo) {
        super(cliente, numeroConta, saldo);
    }

    verSaldo(){
        super.verSaldo();
    };
    sacar(valor){
        super.sacar(valor);
    };
    depositar(valor){
        super.depositar(valor);
    };
    verHistoricoTransacoes(){
        super.verHistoricoTransacoes()
    };

    // verificar rendimentos
    realizarOperacao(tempo){
        let retorno = this.getSaldo() * this.taxaJuros * tempo;
        console.log(`Seu investimento de R$${this.getSaldo()} resultará em R$${retorno} em ${tempo} anos.`)  
    }

}

class HistoricoDeTransacoes {
    
    transacoes = [];
  
    adicionarTransacao(transacao) {
      this.transacoes.push(transacao);
    }
  
    listarTransacoes() {
      return this.transacoes;
    }
}


// const Maria = new Cliente("Maria", 32, 10145326745);
// const conta1 = new ContaCorrente(Maria,76543, 300);

// conta1.depositar(300);
// conta1.verSaldo();
// conta1.sacar(100);
// conta1.verHistoricoTransacoes();
// conta1.realizarOperacao("João", 100);
// conta1.verHistoricoTransacoes();


const Joana = new Cliente("Joana", 32, 10145326745);
const conta2 = new ContaPoupanca(Joana,76543, 500);

conta2.depositar(300);
conta2.verSaldo();
conta2.sacar(100);
conta2.verHistoricoTransacoes();
conta2.realizarOperacao(5);
conta2.verHistoricoTransacoes();