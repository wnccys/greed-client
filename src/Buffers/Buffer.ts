/* import fs from 'fs';

async function run() {


  try {
    const torrent = (fs.readFileSync('660725.torrent'));
    console.log(torrent.toString('utf8'));
  } catch (err) {
    console.error('Erro ao ler o arquivo:', err);
  }
}

run(); código buffer sem serializaçao de bencode */

import * as fs from 'fs';
import { Bencode} from 'bencode-ts';


async function run() {
  try {
    const torrent = Bencode.decode(fs.readFileSync('660725.torrent'));
    const url = Buffer.from(torrent.announce).toString('ascii');
    console.log(url);
  } catch (err) {
    console.error('Erro ao ler o arquivo:', err);
  }
}

run();

  //buffer com serialização de bencode e convertendo ascc para url legivel 

// aqui temos a saida e a url do rastreador udp://tracker.openbittorrent.com:80/announce


/*
d8:announce44:udp://tracker.openbittorrent.com:80/announce13:announce-listll44:udp://tracker.openbittorrent.com:80/announceel42:udp://tracker.opentrackr.org:1337/
:infod6:piece lengthi16384e6:
  8:announce
    udp://tracker.openbittorrent.com:80/announce
  10:comment
    660725.jpg13
  13:creation date
     i1717778498e4
  4:info
    d
      6:length
       i2120881e4
        4:name
        name10:660725.jpg12:
         8:piece length
           i16384e6
            pieces2600:
                �3���&��<t@%m     �{�aʟFځ���‼ m_j�O       _�y�3�O.e�v♂a~gv��jIb��=����'!♂�8�R��♀♣-����]<+������u����m�N0x�69▲��56 7b�іS♫�E�ƭeO�p�FSU( �U��↕�k��@�x�↨&Yᒭ���$�z1�→|1��1�?�*s�YJ�(9►�l�◄�♥e��V�x��3w��Ba♣���׷`���ێ�>��=6�► �P♂bJ����>→��~��*�r�P�L�∟¶+↨�<��♠X��↔��'��&y☻↑�6��♣T�����m���4��↑Z�o�Cԧ▼�☼�m��9�e�↕֊9D�♣^7♥���0��xςPa�϶§c�{ / �o])�'�.�Y�Hr���}2��WҨ�]♀k5dKѴ1�Ej���P���d�u♂A]↨♀▼�dY�FV��҅◄��{�k�ٮ�h��yA��~�↓��Q�.Q��Q��Hp]�↔↔��4�x��(�↕�2     ↨&T♦e♣|⌂~�⌂�Z.�����lbh��g�p7�a*�j�ԧϫC*i5��tF���t2���#�
        oA�OօL�8↨��R⌂.�c▼���f��‼D�ё(���►
        �\b�2�♫q
        6�L�����V��⌂��↕^˯|N7���r��=♦7�6|�r̚8���Q��&)�→�n�♂�৖���▲�e(����F��♥w§���>�$�▲g7E�ǥ��>���*�3)����3�?.Z���sʁ=� �I:7�.�R��K�P2◄�◄�K���♣��z3↕���CB��§�@�ǁ�1T�▬4];S��#�y¶p�`��♠xc#�→F����6� M�p�♣A�►���/��O
        ��v☺���Ĺz?�2�)Ҵ�p���Z��▬e���O(,||a5�A�l��Ȣ=<|↔♦+E$i,4ɣ�Uy��;@����D��B���^����v♣|8�j~�����+}☻j����♦E��☼M�y♂�⌂���f↕�����/�♣��I�� �w�T�0;��ײ�S�FOҌ�♦�C�W��'e��~�`o�dtG�c�►{O�♫→��^��,►�aAKX�       ;�=�K�ݤ♥6♠�bb
        k��[���!$♦1xg45,��6��,  NI�◄�3����§SX�v��ъՏd♥u�n�↓!-���%(����J��K�eA�∟�¶��_♂���‼^@�ooޛ3�p��►�W�q�Vu���mK↓§�k    ♫��q�¶]K0♂�}v:♣�▬��,��↓�♦v=◄{���-����!���-��ܲ���x7�$���_h�k`+��=�d2�R����→��♥� ~��↕}��
        Zj�!�YyО�N�o�:�Bk�gZ�b�)^�8�W�'→,�↕͐|��p⌂��$���↓�☻������t~�*�Z?C�Ŷ�P<B�lw��������'"
        "v☼���x�[�_]�◄?<f1↕����Iiex�*♠�B?5�i��▼��☺‼�q���j�↔ǲ9��z�S�♦�"v�7��↔��C?�↕�_��↨�M����m�↑�       ~H♠ZO�J�O!öM��?jee

*/
