# Casa da Paz Ansible

Playbooks Ansible para administrar os computadores Windows da Casa da Paz pela rede Tailscale.

## Estrutura

- `hosts.ini`: inventario com as maquinas da Casa da Paz no grupo `paz`
- `group_vars/paz.yml`: variaveis padrao do grupo `paz`, incluindo conexao Ansible, caminhos e versoes/URLs de instaladores
- `policies.json`: politicas do Firefox usadas por `configure-firefox-policies.yml`
- `TODO.md`: pendencias operacionais

## Playbooks

- `install-firefox.yml`: instala Firefox
- `install-pwsh.yml`: instala ou atualiza PowerShell 7 a partir de um MSI fixo
- `configure-firefox-policies.yml`: aplica politicas do Firefox
- `install-p7zip.yml`: instala 7-Zip
- `install-gcompris.yml`: instala GCompris com versao parametrizavel
- `install-gcompris-from-local-exe.yml`: instala GCompris a partir de um `.exe` local
- `install-mcpaz-launcher.yml`: instala o launcher `mcpaz`, baixa o Node e instala as dependencias npm
- `install-temurin-jre.yml`: instala o Temurin JRE 25 para Windows x64
- `check-gcompris-version.yml`: verifica a versao do GCompris
- `check-mcpaz-node.yml`: diagnostica existencia, bloqueio, permissoes e execucao do Node usado pelo mcpaz
- `check-pwsh-version.yml`: verifica a versao do PowerShell 7 (`pwsh`)
- `install-ktuberling.yml`: instala Ktuberling
- `install-veyon.yml`: instala Veyon
- `check-veyon-version.yml`: verifica a versao do Veyon
- `disable-touchscreen.yml`: desabilita touch screen
- `enable-touchscreen.yml`: habilita touch screen
- `disable-realtek-audio.yml`: desabilita audio Realtek
- `disable-sleep.yml`: desabilita sleep na tomada e na bateria
- `enable-sleep.yml`: reabilita sleep com os timeouts configurados em `group_vars/paz.yml`
- `mute-volume.yml`: silencia o volume
- `set-shortcuts.yml`: define atalhos na pagina Nova guia do Chrome usando a politica `NTPShortcuts`
- `rename-mccdp-folder.yml`: renomeia pasta na area de trabalho

## Variaveis por grupo e host

O playbook `set-shortcuts.yml` le `chrome_ntp_shortcuts` do inventario.

Valor padrao do grupo:

- `group_vars/paz.yml`

As variaveis de conexao Ansible do grupo `paz` tambem ficam em `group_vars/paz.yml`.
Outros playbooks tambem leem dali caminhos padrao, versoes e URLs de instaladores.

Para sobrescrever em uma maquina especifica, crie um arquivo como:

- `host_vars/PAZ11.yml`

Exemplo:

```yaml
chrome_ntp_shortcuts:
  - name: Casa da Paz | Lista de Jogos
    url: https://lucasmarcos.github.io/jogos
  - name: Khan Academy
    url: https://pt.khanacademy.org/
```

## Uso

Exemplo:

```bash
ansible-playbook -i hosts.ini -f 20 install-gcompris.yml
```

Para rodar em um host especifico:

```bash
ansible-playbook -i hosts.ini install-gcompris.yml --limit PAZ11
```
