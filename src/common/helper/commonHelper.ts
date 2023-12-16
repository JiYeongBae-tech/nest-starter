import { Injectable } from '@nestjs/common';

/**해당 객체가 어떤 타입의 데이터를 담고 있는지를 나타냅니다*/
interface Item {
    [key: string]: any;
}

@Injectable()
export class CommonHelper {

    /**  Record<string, Item>은 "문자열 키를 가진 객체이며, 각 키는 Item 타입의 값을 가진다" 라는 의미입니다.
     *
     *
     * ex
     *
     * type Person = {
     *   name: string;
     *   age: number;
     * };
     *
     * const myRecord: Record<string, Person> = {
     *   "john": { name: "John", age: 30 },
     *   "jane": { name: "Jane", age: 25 },
     *   // ...
     * };
     *
     *
     * */

    public DictByKeyList(array: Item[], key: string): Record<string, Item> {
        return array.reduce((carry: Record<string, Item>, item: Item) => {
            carry[item[key]] = item;
            return carry;
        }, {});
    }

}