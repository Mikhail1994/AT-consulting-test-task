package ru.atconsulting.db.dao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import ru.atconsulting.db.model.Book;

import javax.sql.DataSource;
import java.util.List;


@Repository
public class BookJdbcTemplate implements BookDao{

    private DataSource dataSource;
    private JdbcTemplate jdbcTemplateObject;

    @Override
    @Autowired
    public void setDataSource(DataSource ds) {
        this.dataSource = ds;
        this.jdbcTemplateObject = new JdbcTemplate(dataSource);
    }

    @Override
    public void deleteBook(Integer id) {
        String SQL = "delete from Book where id = ?";
        jdbcTemplateObject.update(SQL, id);
    }

    @Override
    public void addBook(String isn, String author, String title){
        String SQL = "insert into Book (ID, ISN, AUTHOR, TITLE) values (?, ?, ?, ?)";
        jdbcTemplateObject.update( SQL, 13, isn, author, title);
    }

    @Override
    public List<Book> getAllBooks(String sortParam){
        String sql = "select * from BOOK ORDER BY " + sortParam;
        List<Book> allBooks= jdbcTemplateObject.query(sql,
                new BookMapper());
        return  allBooks;
    }
}
