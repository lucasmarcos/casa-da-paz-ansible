# Casa da Paz Ansible

Playbooks Ansible para administrar os computadores Windows da Casa da Paz pela rede Tailscale.

## Estrutura

- `hosts.ini`: inventario com as maquinas da Casa da Paz no grupo `paz`
- `policies.json`: politicas do Firefox usadas por `configure-firefox-policies.yml`
- `TODO.md`: pendencias operacionais

## Playbooks

- `install-firefox.yml`: instala Firefox
- `configure-firefox-policies.yml`: aplica politicas do Firefox
- `install-p7zip.yml`: instala 7-Zip
- `install-gcompris.yml`: instala GCompris por MSI
- `install-gcompris-from-local-exe.yml`: instala GCompris a partir de um `.exe` local
- `upgrade-gcompris.yml`: atualiza GCompris
- `check-gcompris-version.yml`: verifica a versao do GCompris
- `install-ktuberling.yml`: instala Ktuberling
- `install-veyon.yml`: instala Veyon
- `check-veyon-version.yml`: verifica a versao do Veyon
- `disable-touchscreen.yml`: desabilita touch screen
- `enable-touchscreen.yml`: habilita touch screen
- `disable-realtek-audio.yml`: desabilita audio Realtek
- `mute-volume.yml`: silencia o volume
- `set-shortcuts.yml`: define atalhos/paginas no Chrome
- `rename-mccdp-folder.yml`: renomeia pasta na area de trabalho

## Uso

Exemplo:

```bash
ansible-playbook -i hosts.ini install-gcompris.yml
```

Para rodar em um host especifico:

```bash
ansible-playbook -i hosts.ini install-gcompris.yml --limit PAZ11
```
