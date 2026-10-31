# Jardim Smart

Jardim Smart é um protótipo de site para apresentar a ideia de um jardim digital que transforma informações sobre as plantas e o clima local em lembretes de cuidado. O projeto é inspirado no protótipo mobile descrito na documentação do Jardim Smart e usa a paleta verde, madeira, creme e amarelo definida no documento.

> **Estado do projeto:** demonstração estática de interface. O clima, os dados e os intervalos de rega são exemplos; não há consulta meteorológica ou integração com sensores.

## Conteúdo

- [Objetivo](#objetivo)
- [Funcionalidades](#funcionalidades)
- [Plantas disponíveis](#plantas-disponíveis)
- [Tecnologias](#tecnologias)
- [Executar localmente](#executar-localmente)
- [Publicar no GitHub Pages](#publicar-no-github-pages)
- [Estrutura dos arquivos](#estrutura-dos-arquivos)
- [Armazenamento e privacidade](#armazenamento-e-privacidade)
- [Limitações atuais](#limitações-atuais)
- [Próximos passos](#próximos-passos)

## Objetivo

Ajudar pessoas com rotina corrida a acompanhar os cuidados básicos das plantas. A proposta é combinar o tipo da planta, seu ambiente e o clima para apresentar orientações fáceis de entender, reduzir esquecimentos e evitar regas desnecessárias.

## Funcionalidades

- Apresentação responsiva da proposta do Jardim Smart, em telas móveis e desktop.
- Página de demonstração com ilustração animada do canteiro, opções de visualização desktop/celular e seleção de nove plantas.
- Detalhes da planta, mini canteiro para trocar a seleção, calendário ilustrativo de regas e controles de automatização demonstrativa.
- Simulação de temperatura do ar e do solo, umidade do ar e do solo, consumo de água, rega manual e acionamento demonstrativo por limite de umidade.
- Mapa interativo dos componentes, incluindo Raspberry Pi Pico W, sensores, relé, bomba e alimentação, com explicações e ligações conceituais.
- Jardim demonstrativo em grade de nove canteiros.
- Cadastro local de plantas pelos canteiros vazios e remoção pelo diálogo de detalhes.
- Calendário demonstrativo de regas para os próximos sete dias.
- Status individual de cuidado, como **Em dia**, **Precisa regar**, **Atrasada** e **Regada hoje**.
- Ação para marcar uma planta como regada, recalcular a próxima data e atualizar o calendário.
- Persistência das plantas e das regas no armazenamento local do navegador.
- Layout adaptável, foco visível para navegação por teclado e respeito à preferência por movimento reduzido.

Os dados de sensores, temperatura e irrigação da página de demonstração são ilustrativos; os controles não acionam hardware. Os intervalos exibidos são apenas referências do protótipo. Confira a umidade do substrato e as necessidades da espécie antes de regar.

## Plantas disponíveis

A demonstração inclui estas nove espécies:

- Orquídea
- Manjericão
- Jiboia
- Suculenta
- Samambaia
- Espada-de-são-jorge
- Lírio-da-paz
- Cacto
- Costela-de-adão

O jardim comporta até nove plantas ao mesmo tempo. As sete primeiras aparecem inicialmente; Cacto e Costela-de-adão podem ser adicionados nos canteiros livres.

## Tecnologias

- HTML semântico
- CSS responsivo
- JavaScript sem dependências de build ou framework
- `localStorage` do navegador para salvar a demonstração

As fontes Fredoka e Lilita One são carregadas pelo Google Fonts. A fotografia da página inicial é carregada do Unsplash. Esses recursos externos precisam de conexão com a internet; o conteúdo e os estilos principais continuam no próprio repositório.

## Executar localmente

Como o site é estático, não é necessário instalar dependências nem compilar arquivos. Abra `index.html` diretamente no navegador ou sirva a pasta por um servidor HTTP local.

Com Python 3 instalado, execute na raiz do projeto:

```bash
python -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador. No Windows, o comando também pode ser executado no PowerShell.

## Publicar no GitHub Pages

1. Envie os arquivos do projeto para a branch `main` do repositório.
2. No GitHub, abra **Settings > Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/(root)`, depois salve.
5. Aguarde a publicação indicada pelo GitHub Pages.

O projeto não usa etapa de build. Para este repositório, o endereço esperado do site é <https://luangtm.github.io/jardim-smart/> depois que o Pages estiver habilitado.

## Estrutura dos arquivos

```text
.
├── index.html   # Conteúdo e estrutura das seções e diálogos
├── demonstracao.html # Simulação visual e mapa interativo dos componentes
├── styles.css   # Paleta visual, componentes e breakpoints responsivos
├── script.js    # Jardim, calendário, status de rega e armazenamento local
├── demonstracao.js # Seleção de planta, painel, animações e interações da simulação
└── README.md    # Documentação do projeto
```

## Armazenamento e privacidade

As plantas e as datas de rega desta demonstração são guardadas no `localStorage` do navegador, sob a chave `jardim-smart-demo-plants`. Os dados permanecem no navegador usado e não são enviados a um servidor. Limpar os dados do site no navegador remove esse estado local.

A versão atual não solicita localização, não cria contas e não envia notificações.

## Limitações atuais

- A cidade, a temperatura, a chuva e a umidade exibidas são valores ilustrativos.
- A página de demonstração não se conecta a sensores, válvulas ou Raspberry Pi/ESP32; as temperaturas, umidades, consumo de água e acionamento da irrigação são simulados no navegador.
- Não existe conexão com API meteorológica nem cálculo de recomendação baseado em previsão real.
- Os intervalos de rega são sugestões fixas para a demonstração e não substituem orientação de jardinagem.
- Os dados ficam apenas no navegador atual; não há sincronização entre dispositivos ou usuários.
- Não há backend, autenticação, notificações push ou integração com hardware.
- A fotografia e as fontes externas podem não carregar sem conexão à internet.

## Próximos passos

A evolução planejada pode incluir uma API meteorológica, recomendações ajustadas às condições locais, uma aplicação Android e integração opcional com Raspberry Pi ou ESP32. Sensores de umidade e automação de irrigação dependem de uma etapa futura de desenvolvimento e testes; não fazem parte deste protótipo.
