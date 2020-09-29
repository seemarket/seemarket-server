# seemarket-server

시마켓 타입스크립트 서버

## 개발스펙
Typescript, Koa, SocketIO, TypeORM 을 활용합니다.

## 린트
eslint 를 기본으로 연동합니다.
WebStorm 을 IDE 로 권장합니다.

npm package.json 의 lint와 lint:fix 로 사용할 수 있습니다.

lint: 전 코드를 탐색하여 린트를 위반하면 ERR을 출력합니다.
lint:fix : 전 코드를 탐색하여 고칠 수 있는 린트를 자동으로 고칩니다.


# WIKI

## API Endpoints

`GET` /stall
매대 정보 가져오기
##### RESPONSE

key | data type | description
----|-----------|------------
code|int|HTTP STATUS CODE
data|object|결과값
- stall | STALL(#STALL) | 매대정보 |



`GET` /drink
보유하고 있는 음료 리스트 가져오기


##### RESPONSE

key | data type | description
----|-----------|------------
code|int|HTTP STATUS CODE
data|object|결과값
- drink_list | [DRINK](#DRINK) | 입고되어 있는 음료의 종류 |



`GET` /drink/:drink_idx
음료 단일 정보 가져오기

##### RESPONSE

key | data type | description
----|-----------|------------
code|int|HTTP STATUS CODE
data|object|결과값
- drink | DRINK(#DRINK) | 입고되어 있는 음료 |



`GET` /slot/
슬롯 정보 가져오기

##### RESPONSE

key | data type | description
----|-----------|------------
code|int|HTTP STATUS CODE
data|object|결과값
- slot_list | [SLOT](#SLOT) | 각각 슬롯의 정보들 |



`GET` /slot/:slot_idx
개개 슬롯 정보 가져오기

##### RESPONSE

key | data type | description
----|-----------|------------
code|int|HTTP STATUS CODE
data|object|결과값
- slot | SLOT(#SLOT) | 슬롯의 상세 정보|



## Data Model


#### Drink

| key | type | description |
| :-: | :-: | :-: 
| id | int | 음료의 고유 id | 
| type | enum(Big, Small) | 음료캔의 종류 |
| prefab_url | url | 3D 렌더링할 프리펩 | 
| description | string | 간단한 아이템에 대한 설명 |
| price | int | 음료의 가격 |
| thumbnail_url | url | 음료의 2D 섬네일 | 


#### SLOT

| key | type | description |
| :-: | :-: | :-: 
| id | int | 슬롯의 고유 id |
| drink_id | int | 보유하고 있는 드링크 종류 |
| has_drink | bool | 현재 음료가 있는가 없는가 표시함 |
| incoming_time | timestamp  | 입고 예정 시간 |


#### STALL

| key | type | description |
| :-: | :-: | :-: 
| id | int | 매대의 고유 id |
| title | string | 매대의 제목 |
| description | string | 매대의 간략한 설명 |
