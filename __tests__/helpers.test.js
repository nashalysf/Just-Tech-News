const {format_date, format_plural, format_url} = require('../utils/helpers');

test('format_date() returns a date string', () =>{
    const date = new Date('2020-03-20 16:12:03');

    expect(format_date(date)).toBe('3/20/2020');
});

test('pluralize word when 1+', ()=>{
    let Tiger = 'tiger';
    let Lion = 'lion';
    expect(format_plural(Tiger, 2)).toBe('tigers');
    expect(format_plural(Lion, 1)).toBe('lion');
});

test('format_url() returns simplified URL', () =>{
    const url1 = format_url('http://test.com/page/1');
    const url2 = format_url('https://www.coolstuff.com/abcdefg/');
    const url3 = format_url('https://www.google.com?q=hello');

    expect(url1).toBe('test.com');
    expect(url2).toBe('coolstuff.com');
    expect(url3).toBe('google.com');
});